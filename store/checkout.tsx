import { create } from 'zustand';

const useCheckoutStore = create<CheckoutStore>()((set) => ({
  stage: 'address',
  cardDetails: {
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
  },
  setStage: (stage: Stage) => set({ stage }),
  updateCardDetails: (cardDetail: Partial<CardDetails>) =>
    set(({ cardDetails }) => ({ cardDetails: { ...cardDetails, ...cardDetail } })),
}));

export default useCheckoutStore;

type Stage = 'address' | 'payment' | 'success';

type CardDetails = {
  cardNumber?: string;
  cardExpiry?: string;
  cardCvv?: string;
};

export type CheckoutStore = {
  stage: Stage;
  cardDetails: CardDetails;
  setStage: (stage: Stage) => void;
  updateCardDetails: (cardDetail: Partial<CardDetails>) => void;
};
