window.addEventListener('deviceorientation', function(event) {
    // Sử dụng các giá trị alpha, beta, gamma để phát hiện các thay đổi đáng kể
    if (Math.abs(event.alpha) > 30 || Math.abs(event.beta) > 30 || Math.abs(event.gamma) > 30) {
      window.flutter_inappwebview.callHandler('onShakeDetected');
    }
  });