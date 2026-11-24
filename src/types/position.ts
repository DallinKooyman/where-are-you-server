// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

export class Position {
  public latitiude: number = 0;
  public longitude: number = 0;

  Position(lat: number, lon: number) {
    this.latitiude = lat;
    this.longitude = lon;
  }
}
