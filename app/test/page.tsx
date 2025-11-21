export default function TestBlur() {
  return (
    <div style={{ padding: '20px', minHeight: '200vh' }}>
      {/* Fixed blur header */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '80px',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h1 style={{ color: 'white', margin: 0 }}>TEST BLUR HEADER</h1>
      </div>

      {/* Content behind blur */}
      <div style={{ paddingTop: '100px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
          Scroll and check if header has blur effect
        </h1>

        <div style={{
          backgroundImage: 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #f7b731)',
          padding: '40px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h2>Colorful Content for Testing Blur</h2>
          <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        </div>

        <img
          src="/media/pages/home/outside.jpg"
          alt="Test"
          style={{ width: '100%', maxWidth: '800px', marginBottom: '40px' }}
        />

        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} style={{ marginBottom: '40px' }}>
            <h3>Section {i}</h3>
            <p style={{ fontSize: '16px', lineHeight: '1.8' }}>
              {`Content section ${i}. This is some text to create content that will be visible behind the blur effect.
              The header should blur this content when you scroll. If you see blur on the header, then backdrop-filter works!
              If you only see dark transparent, then there's still an issue.`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
