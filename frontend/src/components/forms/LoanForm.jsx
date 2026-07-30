// ============================================================
// LoanForm.jsx – Loan amount / tenure / purpose fields
// ============================================================

import Input from '../ui/Input';
import Select from '../ui/Select';
import { LOAN_PURPOSES } from '../../utils/constants';

function LoanForm({ register, errors, disabled }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Input
        label="Loan Amount (₹)"
        name="loanAmount"
        type="number"
        placeholder="e.g. 1000000"
        register={register}
        error={errors.loanAmount?.message}
        disabled={disabled}
        className="sm:col-span-2"
      />

      <Input
        label="Loan Tenure (months)"
        name="tenure"
        type="number"
        placeholder="6 – 120"
        register={register}
        error={errors.tenure?.message}
        disabled={disabled}
      />

      <Select
        label="Loan Purpose"
        name="purpose"
        options={LOAN_PURPOSES}
        placeholder="Select purpose"
        register={register}
        error={errors.purpose?.message}
        disabled={disabled}
      />
    </div>
  );
}

export default LoanForm;
