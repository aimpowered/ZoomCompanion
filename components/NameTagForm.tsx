import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


import '@/app/css/NameTag.css';

// TODO: deduplicate this with EnabledNameTagBadge
export interface NameTagContent {
  visible: boolean;
  preferredName: string;
  pronouns: string;
  disclosure: string;
}

interface NameTagProps {
  content: NameTagContent;
  onNameTagContentChange: SubmitHandler<NameTagContent>;
}

//TODO: beautify the form, perhaps use Switch rather than Checkbox
export function NameTagForm({
  content,
  onNameTagContentChange
}: NameTagProps) {
  const { register, handleSubmit, control } = useForm<NameTagContent>();

  return (
    <div className="tab-container">
      <h2 className="tab-title">Name Tag</h2>

      <form onSubmit={handleSubmit(onNameTagContentChange)}>
        <div>
          <label>Preferred Name</label>
          <input
            className="text-input"
            defaultValue={content.preferredName}
            {...register("preferredName", { required: true })}
          />
        </div>
        <div>
          <label>Pronouns</label>
          <select
            className="select-input"
            defaultValue={content.pronouns}
            {...register("pronouns")}
          >
            <option value="">Select Pronouns</option>
            <option value="He/Him">He/Him</option>
            <option value="She/Her">She/Her</option>
            <option value="They/Them">They/Them</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Self Disclosure</label>
          <input
            className="text-input"
            defaultValue={content.disclosure}
            {...register("disclosure")}
          />
        </div>
        <div className="form-container">
          <div className="controller-container">
            <Controller
              control={control}
              name="visible"
              defaultValue={content.visible}
              render={({ field: { onChange, value } }) => (
                <FormControlLabel
                  control={
                    <Checkbox checked={value} onChange={onChange} />
                  }
                  label="Display Name Tag"
                  labelPlacement="start"
                  className="label-styling" 
                />
              )}
            />
            </div>
          <input type="submit" className="submit-btn" />
        </div>
      </form>
    </div>
  );
}
