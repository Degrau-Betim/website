async function writeClipboard(value) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    const area = document.createElement("textarea");
    area.value = value;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.left = "-9999px";
    document.body.append(area);
    area.select();
    const copied = document.execCommand("copy");
    area.remove();
    return copied;
  }
}

export function initClipboard(root = document) {
  const status = root.querySelector("[data-copy-status]");

  root.querySelectorAll("[data-copy]").forEach((trigger) => {
    trigger.addEventListener("click", async () => {
      const value = trigger.getAttribute("data-copy");
      if (!value) return;

      const copied = await writeClipboard(value);
      if (!copied) return;

      root.querySelectorAll("[data-copy-feedback]").forEach((item) => {
        item.textContent = "";
      });

      const localStatus = trigger.querySelector("[data-copy-feedback]");
      if (localStatus) localStatus.textContent = "Copiado";
      if (status) status.textContent = `${value} copiado`;
    });
  });
}
