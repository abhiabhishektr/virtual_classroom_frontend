import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

interface ActionButtonWithConfirmationProps {
  buttonText: string;
  confirmationTitle: string;
  confirmationMessage: string;
  confirmButtonText: string;
  onConfirm: () => void;
  successMessage: string;
  successTitle: string;
  buttonStyle?: React.CSSProperties ;
  textStyle?: string;
  overlayStyle?: string;
}

const ActionButtonWithConfirmation: React.FC<ActionButtonWithConfirmationProps> = ({
  buttonText,
  confirmationTitle,
  confirmationMessage,
  confirmButtonText,
  onConfirm,
  successMessage,
  successTitle,
  buttonStyle,
  textStyle,
  overlayStyle,
}) => {
  const MySwal = withReactContent(Swal);

  const handleClick = async () => {
    const result = await MySwal.fire({
      title: confirmationTitle,
      text: confirmationMessage,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
    });

    if (result.isConfirmed) {
      onConfirm();
      MySwal.fire(successTitle, successMessage, 'success');
    }
  };

  return (
    <div
      className={`absolute inset-0 ${overlayStyle} flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer`}
      onClick={handleClick}
      style={buttonStyle as React.CSSProperties}
    >
      <span className={`${textStyle}`}>{buttonText}</span>
    </div>
  );
};

export default ActionButtonWithConfirmation;
