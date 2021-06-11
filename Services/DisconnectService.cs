using System.Collections.Generic;
using Microsoft.AspNetCore.Connections.Features;
using Microsoft.AspNetCore.SignalR;

namespace Bang.Services
{
    public class DisconnectService
    {
        private readonly HashSet<string> _connections;
        private readonly object _connectionsLock;

        public DisconnectService()
        {
            _connections = new HashSet<string>();
            _connectionsLock = new object();
        }

        public void Kick(string ConnectionId)
        {
            if (!_connections.Contains(ConnectionId))
                lock (_connectionsLock)
                {
                    _connections.Add(ConnectionId);
                }
        }

        public void Monitor(HubCallerContext Context)
        {
            var feature = Context.Features.Get<IConnectionHeartbeatFeature>();

            feature.OnHeartbeat(state =>
            {
                if (_connections.Contains(Context.ConnectionId))
                {
                    Context.Abort();
                    lock (_connectionsLock)
                    {
                        _connections.Remove(Context.ConnectionId);
                    }
                }
            }, Context.ConnectionId);
        }
    }
}