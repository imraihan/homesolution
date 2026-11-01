import AuthFlow from '@/components/auth/AuthFlow';

export const metadata = {
  title: 'Create Account',
  description: 'Create your Home Solution account with your phone number.',
  robots: { index: false, follow: true },
  openGraph: { title: 'Create Account | Home Solution', description: 'Create your Home Solution account.' },
};

export default function RegisterPage() {
  return <AuthFlow mode="register" />;
}
