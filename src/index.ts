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

    if (!this.#requests.has(userId)) {
      this.#requests.set(userId, { count: 1, startTime: currentTime });

      return true;
    }

    const currentUser = this.#requests.get(userId)!;

    if (this.#limit === currentUser.count) {
      return false;
    }

    if (currentTime - currentUser.startTime > this.#windowMs) {
      this.#requests.set(userId, { count: 1, startTime: currentTime });

      return true;
    }

    this.#requests.set(userId, {
      ...currentUser,
      count: currentUser.count + 1,
    });

    return true;
  }
}

const limiter = new RateLimiter(5, 60000);

limiter.check("user_1")
limiter.check("user_1")
limiter.check("user_1")
limiter.check("user_1")
limiter.check("user_1")
limiter.check("user_1")
limiter.check("user_1")
limiter.check("user_1")
limiter.check("user_1")



