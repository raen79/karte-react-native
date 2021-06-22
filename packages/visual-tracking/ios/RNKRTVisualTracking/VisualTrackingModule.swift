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

import Foundation
import KarteVisualTracking

internal struct DefaultReactNativeAction: ActionProtocol {
    let action: String
    
    let actionId: String?
    
    let targetText: String?
    
    let screenName: String?
    
    let screenHostName: String?
    
    let imageProvider: ImageProvider?
    
    func image() -> UIImage? {
        return imageProvider?()
    }
}

@objc(KRTVisualTrackingWrapper)
public class VisualTrackingWrapper: NSObject {
    @objc
    public class func handle(_ action: String, actionId: String?, targetText: String?) -> Void {
        let action = DefaultReactNativeAction(action: action,actionId: actionId, targetText: targetText, screenName: nil, screenHostName: nil, imageProvider: nil)
        VisualTracking.handle(actionProtocol: action)
    }
    
    @objc
    public class func view(_ action: String) -> Void {
        let viewController = RCTPresentedViewController()
        let action = ActionFactory.createForUIKit(actionName: action, view: nil, viewController: viewController, targetText: nil, actionId: nil)
        if let action = action {
            VisualTracking.handle(actionProtocol: action)
        }
    }

}
