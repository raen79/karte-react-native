//
//  Copyright 2020 PLAID, Inc.
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//      https://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.
//

import { NativeModules } from 'react-native';
import type { KRTCoreNativeModule } from './types';

class KarteAppBridge {
  constructor(private readonly nativeModule: KRTCoreNativeModule) {
    this.nativeModule = nativeModule;
  }

  /**
   * ビジターIDを返します。
   *
   * @remarks
   * ユーザーを一意に識別するためのID（ビジターID）を返します。
   *
   * なお初期化が行われていない場合は空文字列を返します。
   */
  public get visitorId(): string {
    return this.nativeModule.getVisitorId();
  }

  /**
   * オプトアウトの設定有無を返します。
   *
   * @remarks
   * オプトアウトされている場合は、`true` を返し、されていない場合は `false` を返します。
   *
   * また初期化が行われていない場合は `false` を返します。
   */
  public get isOptOut(): boolean {
    return this.nativeModule.isOptOut();
  }

  /**
   * オプトインします。
   *
   * @remarks
   * 初期化が行われていない状態で呼び出した場合はオプトインは行われません。
   */
  public optIn(): void {
    this.nativeModule.optIn();
  }

  /**
   * オプトアウトします。
   *
   * @remarks
   * 初期化が行われていない状態で呼び出した場合はオプトアウトは行われません。
   */
  public optOut(): void {
    this.nativeModule.optOut();
  }

  /**
   * ビジターIDを再生成します。
   *
   * @remarks
   * ビジターIDの再生成は、現在のユーザーとは異なるユーザーとして計測したい場合などに行います。
   * 例えば、アプリケーションでログアウトを行った場合などがこれに該当します。
   *
   * なお初期化が行われていない状態で呼び出した場合は再生成は行われません。
   */
  public renewVisitorId(): void {
    this.nativeModule.renewVisitorId();
  }
}

class TrackerBridge {
  constructor(private readonly nativeModule: KRTCoreNativeModule) {
    this.nativeModule = nativeModule;
  }

  /**
   * イベントの送信を行います。
   * @param name イベント名
   * @param values イベントに紐付けるカスタムオブジェクト
   */
  public track(name: string, values: object = {}) {
    this.nativeModule.track(name, values ?? {});
  }

  /**
   * Identifyイベントの送信を行います。
   *
   * @param values Identifyイベントに紐付けるカスタムオブジェクト
   */
  public identify(values: object) {
    this.nativeModule.identify(values);
  }

  /**
   * Viewイベントの送信を行います。
   * @param viewName 画面名
   * @param title タイトル
   * @param values Viewイベントに紐付けるカスタムオブジェクト
   */
  public view(viewName: string, title?: string, values: object = {}) {
    this.nativeModule.view(viewName, title, values);
  }
}

class UserSyncBridge {
  constructor(private readonly nativeModule: KRTCoreNativeModule) {
    this.nativeModule = nativeModule;
  }

  /**
   * WebView 連携するためのクラスです。
   *
   * @remarks
   * WebページURLに連携用のクエリパラメータを付与した状態で、URLをWebViewで開くことでWebとAppのユーザーの紐付けが行われます。
   * なお連携を行うためにはWebページに、KARTEのタグが埋め込まれている必要があります。
   */
  public appendingQueryParameter(url: string): string {
    return this.nativeModule.appendingUserSyncQueryParameter(url);
  }
}

/** KARTE SDKのエントリポイントクラスです。 */
export const KarteApp = new KarteAppBridge(NativeModules.RNKRTCoreModule);

/** イベントトラッキングを行うためのクラスです。 */
export const Tracker = new TrackerBridge(NativeModules.RNKRTCoreModule);

/**
 * WebView 連携するためのクラスです。
 *
 * @remarks
 * WebページURLに連携用のクエリパラメータを付与した状態で、URLをWebViewで開くことでWebとAppのユーザーの紐付けが行われます。
 * なお連携を行うためにはWebページに、KARTEのタグが埋め込まれている必要があります。
 */
export const UserSync = new UserSyncBridge(NativeModules.RNKRTCoreModule);
