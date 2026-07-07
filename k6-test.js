import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 20,          // 20 virtual users
  duration: '30s',  // run for 30 seconds
};

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000';

export default function () {
  const res = http.get(`${BASE_URL}/api/items`);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}

// how to run:
// k6 run k6-test.js
// k6 run -e BASE_URL=http://<your-ec2-ip> k6-test.js
