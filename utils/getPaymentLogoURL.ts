import { StripeCardBrand } from "@/generated/graphql";

export const getPaymentLogoURL = (paymentCardBrand?: StripeCardBrand) => {
  switch (paymentCardBrand) {
    case StripeCardBrand.Amex: {
      return require("../assets/images/amex.png");
    }
    case StripeCardBrand.Diners: {
      return require("../assets/images/diners.png");
    }
    case StripeCardBrand.Discover: {
      return require("../assets/images/discover.png");
    }
    case StripeCardBrand.EftposAu: {
      return require("../assets/images/eftpos_au.png");
    }
    case StripeCardBrand.Jcb: {
      return require("../assets/images/jcb.jpeg");
    }
    case StripeCardBrand.Mastercard: {
      return require("../assets/images/mastercard.png");
    }
    case StripeCardBrand.Unionpay: {
      return require("../assets/images/unionpay.png");
    }
    case StripeCardBrand.Visa: {
      return require("../assets/images/visa.png");
    }
    default: {
      return require("../assets/images/mastercard.png");
    }
  }
};
