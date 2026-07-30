// ============================================================
// BusinessForm.jsx – Business owner fields (RHF controlled)
// ============================================================

import Input from '../ui/Input';
import Select from '../ui/Select';
import { BUSINESS_TYPES } from '../../utils/constants';

function BusinessForm({ register, errors, disabled }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Input
        label="Business Owner Name"
        name="ownerName"
        placeholder="e.g. Ravi Sharma"
        register={register}
        error={errors.ownerName?.message}
        disabled={disabled}
      />

      <Input
        label="PAN Number"
        name="pan"
        placeholder="ABCDE1234F"
        register={register}
        error={errors.pan?.message}
        disabled={disabled}
      />

      <Select
        label="Business Type"
        name="businessType"
        options={BUSINESS_TYPES}
        placeholder="Select business type"
        register={register}
        error={errors.businessType?.message}
        disabled={disabled}
      />

      <Input
        label="Monthly Revenue (₹)"
        name="monthlyRevenue"
        type="number"
        placeholder="e.g. 250000"
        register={register}
        error={errors.monthlyRevenue?.message}
        disabled={disabled}
      />
    </div>
  );
}

export default BusinessForm;
