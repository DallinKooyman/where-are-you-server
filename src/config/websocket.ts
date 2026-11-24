// Copyright (c) 2026 Dallin Kooyman
// SPDX-License-Identifier: GPL-3.0-only
// See LICENSE in the project root for license information.

import WebSocket, { WebSocketServer } from 'ws';
import { IncomingMessage, Server } from 'http';

// Data is strucutred as Map<userId, Set<Socket Connections>>
export const userConnections = new Map<string, Set<WebSocket>>();

export function initializeWebSocket(server: Server) {
  //Web Socket Server
  const wss = new WebSocketServer({ server: server });

  wss.on('connection', async (ws: WebSocket, request: IncomingMessage) => {
    console.log('WebSocket client connected');
    const url = new URL(request.url!, `http://${request.headers.host}`);
    const userId = url.searchParams.get('userId');

    if (!userId) {
      ws.close(1008, 'User ID required');
      return;
    }

    if (!userConnections.has(userId)) {
      userConnections.set(userId, new Set());
    }
    userConnections.get(userId)!.add(ws);

    // Handle disconnect
    ws.on('close', () => {
      console.log(`[WS] User disconnected}`);
      const connections = userConnections.get(userId);
      if (connections) {
        connections.forEach((conn) => {
          if (conn === ws) {
            connections.delete(conn);
          }
        });
        if (connections.size === 0) {
          userConnections.delete(userId);
        }
      }
    });
  });
}

export function stopWebSocket(server: Server) {
  const wss = new WebSocketServer({ server: server });

  wss.clients.forEach((socket) => {
    socket.close(1001, 'Server shutting down');
  });

  wss.close();

  userConnections.clear();
}
