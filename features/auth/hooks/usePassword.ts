import { passwordStrength } from "check-password-strength";
export const minimumPasswordLength = 8;

const usePassword = () => {
  const passwordStrengthText = (password: string) =>
    passwordStrength(password).value;

  const passwordStrengthColor = (password: string) => {
    switch (passwordStrength(password).id) {
      case 0:
        return "$red";
      case 1:
        return "$orange";
      case 2:
        return "$goldenYellow";
      case 3:
        return "$green";
      default:
        break;
    }
  };

  const passwordLengthPercentage = (password: string) =>
    ((passwordStrength(password).id + 1) * 100) / 4;

  return {
    minimumPasswordLength,
    passwordStrengthText,
    passwordStrengthColor,
    passwordLengthPercentage,
  };
};

export default usePassword;
