import AuthFlow from '@/components/auth/AuthFlow';

export const metadata = {
  title: 'Login',
  description: 'Log in to Home Solution with your phone number and one-time password.',
  robots: { index: false, follow: true },
  openGraph: { title: 'Login | Home Solution', description: 'Log in to Home Solution with your phone number.' },
};

export default function LoginPage() {
  return <AuthFlow mode="login" />;
}
