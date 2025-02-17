const currentObjectUrl: string[] = [];

const decryptionKeyDomTitle: HTMLInputElement = document.querySelector(
  "#decryption-key-title",
)!;
const decryptionKeyDomContent: HTMLInputElement = document.querySelector(
  "#decryption-key-content",
)!;

const btnDecrypt: HTMLButtonElement = document.querySelector("#btn-decrypt")!;
const btnReset: HTMLButtonElement = document.querySelector("#btn-reset")!;

const btnKeyClearTitle: HTMLButtonElement = document.querySelector(
  "#btn-key-clear-title",
)!;
const btnKeyClearContent: HTMLButtonElement = document.querySelector(
  "#btn-key-clear-content",
)!;

const dumpItems = function (): NodeListOf<HTMLElement> {
  return document.querySelectorAll(".dump-item")!;
};
const Encrypted = "Encrypted" as const;

function arrayBufferToHex(buffer: ArrayBuffer) {
  const array = Array.from(new Uint8Array(buffer));
  return array.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function sha256BufferDigest(buffer: BufferSource) {
  const msgHashBytes = await window.crypto.subtle.digest("SHA-256", buffer);
  return msgHashBytes;
}

async function sha256StringDigest(message: string) {
  const msgEncoded = new TextEncoder().encode(message);
  return await sha256BufferDigest(msgEncoded);
}

async function aesBufferDecryption(keyString: string, buffer: ArrayBuffer) {
  const key = await window.crypto.subtle.importKey(
    "raw",
    await sha256StringDigest(keyString),
    "AES-CBC",
    true,
    ["decrypt"],
  );
  const iv = buffer.slice(0, 16);
  const content = buffer.slice(16);
  let result = null;

  try {
    result = await window.crypto.subtle.decrypt(
      { name: "AES-CBC", iv },
      key,
      content,
    );
  } catch (e) {
    console.debug(e);
  }

  return result;
}

function clearCurrentObjectLink() {
  if (currentObjectUrl.length <= 0) {
    return;
  }

  currentObjectUrl.forEach((link) => URL.revokeObjectURL(link));
  currentObjectUrl.length = 0;
}

btnDecrypt.addEventListener("click", () => {
  clearCurrentObjectLink();
});
btnReset.addEventListener("click", () => {
  clearCurrentObjectLink();
});

export {
  currentObjectUrl,
  decryptionKeyDomTitle,
  decryptionKeyDomContent,
  btnDecrypt,
  btnReset,
  btnKeyClearTitle,
  btnKeyClearContent,
  dumpItems,
  clearCurrentObjectLink,
  Encrypted,
  aesBufferDecryption,
  arrayBufferToHex,
  sha256BufferDigest,
  sha256StringDigest,
};
