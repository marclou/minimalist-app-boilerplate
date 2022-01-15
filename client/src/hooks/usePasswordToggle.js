import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

export const usePasswordToggle = () => {
  const [visible, setVisibility] = useState(false);

  const Icon = <FontAwesomeIcon icon={visible ? faEyeSlash : faEye} onClick={() => setVisibility((visible) => !visible)} />;

  const InputType = visible ? 'text' : 'password';

  return [InputType, Icon];
};
