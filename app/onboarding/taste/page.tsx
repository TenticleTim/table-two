'use client';
import { useRouter } from 'next/navigation';
import { TasteOnboardingFlow } from '@/components/TasteOnboardingFlow';

export default function TasteOnboardingPage() {
  const router = useRouter();

  return (
    <TasteOnboardingFlow
      onComplete={() => {
        router.push('/discover/for-you');
      }}
    />
  );
}
