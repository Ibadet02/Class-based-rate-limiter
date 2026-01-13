class RateLimiter {
  #requests = new Map<string, { count: number; startTime: number }>();
  #limit;
  #windowMs;

  constructor(limit: number, windowMs: number) {
    this.#limit = limit;
    this.#windowMs = windowMs;
  }

  check(userId: string) {
    const currentTime = Date.now();
    const currentUser = this.#requests.get(userId);

    if (!currentUser || currentTime - currentUser.startTime > this.#windowMs) {
      this.#requests.set(userId, { count: 1, startTime: currentTime });

      return true;
    }

    if (this.#limit <= currentUser.count) {
      return false;
    }

    currentUser.count++;
    return true;
  }

  get stats() {
    return this.#requests.size;
  }

  clear(userId: string) {
    return this.#requests.delete(userId);
  }
}

const limiter = new RateLimiter(5, 2000);

limiter.check("user_1");
limiter.check("user_1");
limiter.check("user_1");
limiter.check("user_1");
limiter.check("user_1");
limiter.check("user_1");
limiter.check("user_1");
limiter.check("user_1");
limiter.clear("user_1");
limiter.check("user_1");

setTimeout(() => {
  limiter.check("user_9");
  limiter.check("user_2");
}, 3000);
