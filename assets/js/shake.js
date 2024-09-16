if ('permissions' in navigator && 'Accelerometer' in window) {
    navigator.permissions.query({ name: 'accelerometer' }).then((result) => {
      if (result.state === 'denied') {
        console.log('Permission to use accelerometer sensor is denied.');
        return;
      }
  
      // Initialize the accelerometer
      const accelerometer = new Accelerometer({ frequency: 60 });
      let lastX, lastY, lastZ;
      const SHAKE_THRESHOLD = 15; // Arbitrary threshold for shake detection
  
      accelerometer.addEventListener('reading', () => {
        const { x, y, z } = accelerometer;
  
        // Detect significant changes in acceleration
        if (lastX !== undefined && lastY !== undefined && lastZ !== undefined) {
          const dx = Math.abs(x - lastX);
          const dy = Math.abs(y - lastY);
          const dz = Math.abs(z - lastZ);
          if (dx > SHAKE_THRESHOLD || dy > SHAKE_THRESHOLD || dz > SHAKE_THRESHOLD) {
            window.flutter_inappwebview.callHandler('onShakeDetected');
          }
        }
  
        lastX = x;
        lastY = y;
        lastZ = z;
      });
  
      accelerometer.start();
    }).catch((error) => {
      console.error('Error querying permission:', error);
    });
  } else {
    console.warn('Permissions API or Accelerometer is not supported.');
  }

  