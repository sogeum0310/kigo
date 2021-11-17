<ref *1> Server {
  _events: [Object: null prototype] {},
  _eventsCount: 0,
  _maxListeners: undefined,
  _nsps: Map(1) {
    '/' => Namespace {
      _events: [Object: null prototype],
      _eventsCount: 1,
      _maxListeners: undefined,
      sockets: Map(0) {},
      _fns: [],
      _ids: 0,
      server: [Circular *1],
      name: '/',
      adapter: [Adapter],
      [Symbol(kCapture)]: false
    }
  },
  parentNsps: Map(0) {},
  _path: '/socket.io',
  clientPathRegex: /^\/socket\.io\/socket\.io(\.min|\.msgpack\.min)?\.js(\.map)?(?:\?|$)/,
  _connectTimeout: 45000,
  _serveClient: true,
  _parser: {
    protocol: 5,
    PacketType: {
      '0': 'CONNECT',
      '1': 'DISCONNECT',
      '2': 'EVENT',
      '3': 'ACK',
      '4': 'CONNECT_ERROR',
      '5': 'BINARY_EVENT',
      '6': 'BINARY_ACK',
      CONNECT: 0,
      DISCONNECT: 1,
      EVENT: 2,
      ACK: 3,
      CONNECT_ERROR: 4,
      BINARY_EVENT: 5,
      BINARY_ACK: 6
    },
    Encoder: [class Encoder],
    Decoder: [class Decoder extends Emitter]
  },
  encoder: Encoder {},
  _adapter: [class Adapter extends EventEmitter],
  sockets: <ref *2> Namespace {
    _events: [Object: null prototype] { connection: [Function (anonymous)] },
    _eventsCount: 1,
    _maxListeners: undefined,
    sockets: Map(0) {},
    _fns: [],
    _ids: 0,
    server: [Circular *1],
    name: '/',
    adapter: Adapter {
      _events: [Object: null prototype] {},
      _eventsCount: 0,
      _maxListeners: undefined,
      nsp: [Circular *2],
      rooms: Map(0) {},
      sids: Map(0) {},
      encoder: Encoder {},
      [Symbol(kCapture)]: false
    },
    [Symbol(kCapture)]: false
  },
  opts: {},
  [Symbol(kCapture)]: false
}