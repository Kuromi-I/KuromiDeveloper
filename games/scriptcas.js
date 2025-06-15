    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    let x = 50;
    let y = 50;
    const size = 30;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "lime";
      ctx.fillRect(x, y, size, size);
    }

    function move(dx, dy) {
      x += dx;
      y += dy;
      draw();
    }

    // Teclado
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp": move(0, -10); break;
        case "ArrowDown": move(0, 10); break;
        case "ArrowLeft": move(-10, 0); break;
        case "ArrowRight": move(10, 0); break;
      }
    });

    // Touch
    canvas.addEventListener("touchstart", (e) => {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      const touchX = touch.clientX - rect.left;
      const touchY = touch.clientY - rect.top;

      if (touchX < x) move(-10, 0);
      else if (touchX > x + size) move(10, 0);
      if (touchY < y) move(0, -10);
      else if (touchY > y + size) move(0, 10);
    });

    draw();