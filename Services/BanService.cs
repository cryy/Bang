using System.Collections.Concurrent;
using System.Linq;

namespace Bang.Services
{
    public class BanService
    {
        private readonly ConcurrentBag<byte[]> _ips;

        public BanService()
        {
            _ips = new ConcurrentBag<byte[]>();
        }

        public void Ban(byte[] ipBytes)
        {
            _ips.Add(ipBytes);
        }

        public bool Exists(byte[] ipBytes)
        {
            foreach (var ip in _ips)
                if (ipBytes.SequenceEqual(ip))
                    return true;

            return false;
        }
    }
}