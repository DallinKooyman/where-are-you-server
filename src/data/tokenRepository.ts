// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import { TokenModel, TokenPopulated } from '../models/tokens.js';
import { Token, TokenInput } from '../types/token.js';

export const TokenRepository = {
  async create(data: TokenInput): Promise<Token | null> {
    const doc = await TokenModel.create(data);
    return await this.findById(doc.id);
  },
  async findById(id: string): Promise<Token | null> {
    const token = await TokenModel.findById(id).populate('user').lean<TokenPopulated>();
    return token ? toToken(token) : null;
  },
  async findByHash(tokenHash: string): Promise<Token | null> {
    const token = await TokenModel.findOneAndUpdate({ tokenHash }).lean<TokenPopulated>();
    return token ? toToken(token) : null;
  },
  async updateToken(id: string, expireDate: Date): Promise<void> {
    await TokenModel.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          lastUsedAt: Date.now(),
          expiresAt: expireDate,
        },
      }
    );
  },
  async revokeToken(_id: string, userId: string): Promise<void> {
    await TokenModel.updateOne(
      { _id, userId, revokedAt: null },
      {
        $set: { revokedAt: Date.now() },
      }
    );
  },
  async revokeAllUserTokens(userId: string): Promise<void> {
    await TokenModel.updateMany(
      { userId, revokedAt: null },
      {
        $set: { revokedAt: Date.now() },
      }
    );
  },
};

function toToken(token: TokenPopulated): Token {
  return {
    id: token._id!.toString(),
    tokenHash: token.tokenHash,
    userId: token.userId,
    deviceId: token.deviceId,
    createdAt: token.createdAt,
    lastUsedAt: token.lastUsedAt,
    expiresAt: token.expiresAt,
    revokedAt: token.revokedAt,
  };
}
