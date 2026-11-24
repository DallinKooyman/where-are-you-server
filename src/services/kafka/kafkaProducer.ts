// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import { producer } from '../../config/kafka.js';

export async function sendMessage(topic: string, key: string, value: string) {
  await producer.send({
    topic: topic,
    messages: [
      {
        key: key,
        value: value,
      },
    ],
  });
}
