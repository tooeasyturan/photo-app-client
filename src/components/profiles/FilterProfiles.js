/** @format */

import React from "react";
import { Dropdown } from "semantic-ui-react";

const FilterProfiles = ({ handleStatusFilter }) => {
  const statusOptions = [
    { key: "all", text: "All", value: "all" },
    { key: "photographer", text: "Photographer", value: "photographer" },
    { key: "model", text: "Model", value: "model" },
  ];

  return (
    <Dropdown
      placeholder='Status'
      selection
      options={statusOptions}
      onChange={handleStatusFilter}
    />
  );
};

export default FilterProfiles;
