import React from 'react';

interface PasswordStrengthMeterProps {
  strength: number;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ strength }) => {
  const getStrengthLabel = (strength: number) => {
    switch (strength) {
      case 1: return 'Muy débil';
      case 2: return 'Débil';
      case 3: return 'Moderada';
      case 4: return 'Fuerte';
      case 5: return 'Muy fuerte';
      default: return 'Muy débil';
    }
  };

  const strengthClass = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-300', 'bg-green-500'][strength - 1] || 'bg-red-500';

  return (
    <div className="mt-4">
      <div className="flex justify-between">
        <span>Fuerza:</span>
        <span>{getStrengthLabel(strength)}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded mt-2">
        <div className={`h-full ${strengthClass} rounded`} style={{ width: `${strength * 20}%` }}></div>
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;