import { it, expect, vi } from "vitest";

it("promises", async () => {
  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("something important");
    }, 1000);
  });

  await vi.waitFor(() =>
    myPromise
      .then((value) => console.log(value))
      .catch((error) => console.log("handle error"))
      .finally(() => console.log("finally"))
  );
});

it("awaits", async () => {
  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      reject("await promise");
    }, 1000);
  });

  try {
    const result = await myPromise;
    console.log(result);
  } catch (error) {
    expect(error).toBe("await promise");
  }
});
