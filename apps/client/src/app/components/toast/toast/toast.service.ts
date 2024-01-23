import { ApplicationRef, EmbeddedViewRef, Injectable, createComponent } from "@angular/core";
import { ToastComponent, ToastType } from "./toast.component";

@Injectable({
  providedIn: "root"
})
export class Toast {
  private created = false;

  public static message: string;

  constructor(private appRef: ApplicationRef){}

  private open(message: string, type: ToastType): void {
    if (this.created) {
      return;
    }

    const toastRef = createComponent(ToastComponent, { environmentInjector: this.appRef.injector });
    toastRef.setInput("message", message);
    toastRef.setInput("type", type);

    this.appRef.attachView(toastRef.hostView);
    const el = (<EmbeddedViewRef<any>>toastRef.hostView).rootNodes[0] as HTMLElement;
    document.body.appendChild(el);
    this.created = true;

    setTimeout(() => {
      this.appRef.detachView(toastRef.hostView);
      toastRef.destroy();
      this.created = false;
    }, 5000);
  }

  public success(message: string): void {
    this.open(message, "success");
  }

  public error(message: string): void {
    this.open(message, "error");
  }
  
  public info(message: string): void {
    this.open(message, "info");
  }
}