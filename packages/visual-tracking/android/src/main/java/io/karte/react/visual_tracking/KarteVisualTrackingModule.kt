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
package io.karte.react.visual_tracking

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise
import io.karte.android.visualtracking.BasicAction
import io.karte.android.visualtracking.VisualTracking
import io.karte.android.visualtracking.VisualTrackingDelegate

class KarteVisualTrackingModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  private var isPaired : Boolean = VisualTracking.isPaired

  init {
     VisualTracking.delegate = object : VisualTrackingDelegate(){
       override fun onDevicePairingStatusUpdated(isPaired: Boolean) {
         super.onDevicePairingStatusUpdated(isPaired)
       }
     }
  }

    override fun getName(): String {
        return "RNKRTVisualTracking"
    }

    // Example method
    // See https://reactnative.dev/docs/native-modules-android
    @ReactMethod
    fun multiply(a: Int, b: Int, promise: Promise) {

      promise.resolve(a * b)

    }

  @ReactMethod
  fun handle(action:String, actionId: String, targetText: String) {
    VisualTracking.handle(BasicAction(action, actionId, targetText))
  }

}
