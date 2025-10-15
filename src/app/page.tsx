
import { redirect } from 'next/navigation';

export default function Page() {
  // Redirect root (/) to /home where the actual home component lives
  redirect('/home');
}
