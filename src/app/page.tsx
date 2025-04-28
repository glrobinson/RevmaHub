import { redirect } from 'next/navigation';

export default function RedirectToDefaultLocale() {
  redirect('/el');
}
