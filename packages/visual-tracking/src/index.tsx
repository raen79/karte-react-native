//
//  Copyright 2021 PLAID, Inc.
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
import type { KRTVisualTrackingNativeModule } from './types';

const nativeModule: KRTVisualTrackingNativeModule =
  NativeModules.RNKRTVisualTrackingModule;

/** ビジュアルトラッキングの管理を行うクラスです。  */
export class VisualTracking {
  private constructor() {}
  /**
   * 操作ログをハンドルします。
   *
   * @remarks
   * 操作ログはペアリング時のみ送信されます。 イベント発火条件定義に操作ログがマッチした際にビジュアルイベントが送信されます。
   *
   * @param action アクション名
   * @param actionId アクションID（アクションIDにはアプリ再起動時も変化しない一意なIDを設定してください。）
   * @param targetText ターゲット文字列（Viewコンポーネントのタイトルなど）
   */
  public static handle(action: String, actionId?: String, targetText?: String) {
    nativeModule.handle(action, actionId, targetText);
  }

  /**
   * 画面遷移ログをハンドルします。
   *
   * @remarks
   * 画面遷移ログはペアリング時のみ送信されます。 イベント発火条件定義に画面遷移ログがマッチした際にビジュアルイベントが送信されます。
   *
   * @param action アクション名
   */
  public static view(action: String) {
    nativeModule.view(action);
  }
}
