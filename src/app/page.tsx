import { ImmersiveView } from '@/components/immersive-view';
import { GlassPanelLayout } from '@/components/glass-panel-layout';

export default function Home() {
  return (
    <main className="bg-background">
      <ImmersiveView>
        <GlassPanelLayout />
      </ImmersiveView>
    </main>
  );
}
