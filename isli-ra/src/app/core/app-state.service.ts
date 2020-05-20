import { Injectable } from '@angular/core';

export interface InternalStateType {
  [key: string]: any;
}

@Injectable()
export class AppState {
  constructor() {}
  private prefix = 'mpr_game';
  public state: any = {};

  // public shopId = 1402;

  private getKey(prop: string) {
    return this.prefix + prop;
  }
  public get(prop?: any) {
    const state = this.state;
    const key = this.getKey(prop);
    let value = state.hasOwnProperty(key) ? state[key] : null;
    if (!value) {
      value = sessionStorage.getItem(key);
      if (value && value.startsWith('{')) {
        try {
          value = JSON.parse(value);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return value;
  }

  public set(prop: string, value: any) {
    // internally mutate our state
    const key = this.getKey(prop);
    this.state[key] = value;
    if (!value) {
      sessionStorage.removeItem(key);
    }
    if (value && typeof value === 'object') {
      sessionStorage.setItem(key, JSON.stringify(value));
    } else {
      sessionStorage.setItem(key, value);
    }
  }

  public setPromise(prop: string, value: Promise<any>) {
    const key = this.getKey(prop);
    this.state[key] = value;
  }

  public getPromise(prop: string) {
    const key = this.getKey(prop);
    return this.state[key] ? this.state[key] : Promise.resolve(null);
  }

  public clear(prefix: string) {
    for (const name in this.state) {
      if (name.startsWith(prefix)) {
        this.state[name] = undefined;
      }
    }
  }

  private _clone(object: InternalStateType) {
    // simple object clone
    return JSON.parse(JSON.stringify(object));
  }
}
