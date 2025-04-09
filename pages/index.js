import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    const wsUrl = 'wss://s14304.blr1.piesocket.com/v3/1?api_key=uvYfzw7iPOhoyyy20TAS7uEsfVsMCp3mJhz5NsGQ&notify_self=1';
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      console.log('WebSocket connected');
      socketRef.current.send(JSON.stringify({ type: 'join', roomId: 'demo-room' }));
    };

    socketRef.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setMessages((prev) => [...prev, data]);
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  }, []);

  useEffect(() => {
    // Supabaseからデータをフェッチ
    (async () => {
      const { data, error } = await supabase.from('rooms').select('*');
      if (!error && data) {
        console.log(data);
      }
    })();
  }, []);

  return (
    <main style={{ padding: '1rem' }}>
      <h1>Test Web Poker</h1>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{JSON.stringify(msg)}</li>
        ))}
      </ul>
    </main>
  );
}
