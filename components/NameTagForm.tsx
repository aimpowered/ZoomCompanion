import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';


import '@/app/css/NameTag.css';

// TODO: deduplicate this with EnabledNameTagBadge
export interface NameTagContent {
  visible: boolean;
  fullName: string;
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
    <div className="nametag-container">
      <div className="header">
        <h2 className="title">Name Tag</h2>
      </div>

      <form onSubmit={handleSubmit(onNameTagContentChange)}>
        <div>
          <label>Full Name</label>
          <input
            className="text-input"
            defaultValue={content.fullName}
            {...register("fullName", { required: true })}
          />
        </div>
        <div>
          <label>Preferred Name</label>
          <input
            className="text-input"
            defaultValue={content.preferredName}
            {...register("preferredName")}
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
        <div>
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
                labelPlacement="end"
              />
            )}
          />
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}
