import wordLibrary from "@/data/floatWords";

export default {
  mounted(el:HTMLElement) {
    el.addEventListener("click", (e) => {
      // 随机一句
      const word = wordLibrary[Math.floor(Math.random() * wordLibrary.length)] ?? ''
      const text = document.createElement("span");
      text.innerText = word;

      Object.assign(text.style, {
        position: "fixed",
        left: e.clientX + "px",
        top: e.clientY + "px",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        fontSize: "14px",
        fontWeight: "bold",
        color: "#BBEEFF",
        opacity: 1,
        whiteSpace: "nowrap",
        transition: "all 0.9s ease-out",
        zIndex: 9999,
        userSelect: "none"
      });

      document.body.appendChild(text);

      // 动画
      requestAnimationFrame(() => {
        text.style.top = e.clientY - 50 + "px";
        text.style.opacity = String(0);
      });

      setTimeout(() => text.remove(), 900);
    });
  }
};
