// ============================================================
// Home.jsx – Loan application form + live decision result
// ============================================================

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Loader from '../components/ui/Loader';
import BusinessForm from '../components/forms/BusinessForm';
import LoanForm from '../components/forms/LoanForm';
import DecisionResult from '../components/DecisionResult';
import { applicationSchema } from '../schemas/applicationSchema';
import { createBusiness, createLoan, startDecision } from '../services/api';
import { useDecisionPoll } from '../hooks/useDecisionPoll';

function Home() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [decisionId, setDecisionId] = useState(null);

  const { decision, status, elapsedMs, error, reset } = useDecisionPoll(decisionId);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm({
    resolver: zodResolver(applicationSchema),
    mode: 'onChange', // realtime validation
    defaultValues: {
      ownerName: '',
      pan: '',
      businessType: '',
      monthlyRevenue: '',
      loanAmount: '',
      tenure: '',
      purpose: '',
    },
  });

  const isBusy = submitting || status === 'processing';

  /**
   * Submit flow: Business → Loan → Decision → poll until done
   */
  const onSubmit = async (values) => {
    setSubmitting(true);
    reset();
    setDecisionId(null);

    try {
      const business = await createBusiness({
        ownerName: values.ownerName,
        pan: values.pan,
        businessType: values.businessType,
        monthlyRevenue: values.monthlyRevenue,
      });

      const loan = await createLoan({
        businessId: business.id,
        loanAmount: values.loanAmount,
        tenure: values.tenure,
        purpose: values.purpose,
      });

      const started = await startDecision({
        businessId: business.id,
        loanId: loan.id,
      });

      toast.success('Application submitted — evaluating credit...');
      setDecisionId(started.id);
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Submission failed';
      toast.error(message);

      // Route to error page for unexpected server failures
      if (!err.response || err.response.status >= 500) {
        navigate('/error', { state: { message } });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    reset();
    setDecisionId(null);
    resetForm();
  };

  return (
    <div>
      {/* Hero – brand first, one headline, one CTA context */}
      <section className="mb-10 animate-fadeUp">
        <p className="font-display text-5xl font-bold tracking-tight text-brand-700 dark:text-brand-300 sm:text-6xl">
          Vitto
        </p>
        <h1 className="mt-3 max-w-xl text-xl text-ink-800 dark:text-ink-100 sm:text-2xl">
          Clear MSME lending decisions in seconds.
        </h1>
        <p className="mt-2 max-w-lg text-sm text-ink-700/70 dark:text-ink-200/60">
          Enter business and loan details. Our engine returns approval, score, and reason codes.
        </p>
      </section>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <Card
          title="Business Details"
          subtitle="Tell us about the MSME applicant"
        >
          <BusinessForm register={register} errors={errors} disabled={isBusy} />
        </Card>

        <Card title="Loan Details" subtitle="How much funding is needed?">
          <LoanForm register={register} errors={errors} disabled={isBusy} />
        </Card>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit" loading={isBusy} disabled={isBusy}>
            {status === 'processing' ? 'Processing…' : 'Submit Application'}
          </Button>
          <Button type="button" variant="secondary" onClick={handleReset} disabled={isBusy}>
            Reset
          </Button>

          {/* Live processing timer while polling */}
          {status === 'processing' && (
            <span className="text-sm text-ink-700/70 dark:text-ink-200/60 animate-pulseSoft">
              Elapsed {(elapsedMs / 1000).toFixed(1)}s
            </span>
          )}
        </div>
      </form>

      {status === 'processing' && (
        <div className="mt-8">
          <Loader label="Running decision engine…" />
        </div>
      )}

      {status === 'failed' && (
        <p className="mt-6 text-sm text-red-600 dark:text-red-300">{error}</p>
      )}

      {status === 'completed' && (
        <DecisionResult decision={decision} elapsedMs={elapsedMs} />
      )}
    </div>
  );
}

export default Home;
