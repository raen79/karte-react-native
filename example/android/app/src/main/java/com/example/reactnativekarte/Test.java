package com.example.reactnativekarte;

import android.app.Activity;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;

public class Test {

  private static void log(String msg) {
    Log.d("MainActivity", msg);
  }

  public static void work(Activity activity) {
    activity.getWindow().getDecorView().postDelayed(() -> {
      log( "post");
      work((ViewGroup)activity.getWindow().getDecorView(), "");
    }, 5000);
  }
  private static void work(ViewGroup viewGroup, String indent) {
    for (int i = 0; i < viewGroup.getChildCount(); i++) {
      View view = viewGroup.getChildAt(i);
      log(indent + "" + view);
      view.setOnClickListener(v -> log("onClick " + v));
      view.setOnTouchListener((v, event) -> {
        log("onTouch " + v + ", " + event);
        return false;
      });
      if (view instanceof ViewGroup)
        work((ViewGroup) view, indent + "   ");
    }
  }
}
