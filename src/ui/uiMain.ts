import { UiClippingButton } from '@/ui/uiClippingButton';

export class UiMain {
  public init() {
    const container = document.body.querySelector('#container') as HTMLDivElement;

    UiClippingButton.inst().init(container);
  }
}
