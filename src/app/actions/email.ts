
'use server';

/**
 * @fileOverview Server Action for sending auth emails via Brevo API.
 */

export async function sendAuthEmail(
  email: string, 
  code: string, 
  name: string, 
  type: 'registration' | 'reset' = 'register'
) {
  const brevoApiKey = process.env.BREVO_API_KEY || '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';
  const senderEmail = process.env.BREVO_SENDER_EMAIL || 'noreply@irggorg.ru';
  const senderName = 'IRGG Global';

  const isReset = type === 'reset';
  const title = isReset ? 'Восстановление доступа' : 'Подтверждение регистрации';
  const message = isReset 
    ? 'Используйте следующий код для восстановления пароля от вашего личного кабинета IRGG:'
    : 'Используйте следующий код для подтверждения регистрации в партнерской сети IRGG:';

  const htmlContent = `
    <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #FAF9F8; border: 1px solid #EAE8E4;">
      <h1 style="font-family: 'Playfair Display', serif; color: #8B5E3C; font-size: 32px; text-transform: uppercase; letter-spacing: -1px; margin-bottom: 24px;">IRGG</h1>
      <h2 style="color: #1a1715; font-size: 18px; margin-bottom: 16px; text-transform: uppercase; letter-spacing: 1px;">${title}</h2>
      <p style="color: #4A3728; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
        Здравствуйте${name ? `, ${name}` : ''}.<br>
        ${message}
      </p>
      <div style="background-color: #FFFFFF; border: 1px solid #8B5E3C; padding: 32px; text-align: center; margin-bottom: 32px;">
        <span style="font-size: 48px; font-weight: 900; letter-spacing: 12px; color: #1a1715;">${code}</span>
      </div>
      <p style="color: #8B5E3C; font-size: 12px; text-transform: uppercase; font-weight: bold; letter-spacing: 2px;">
        Код действителен в течение 15 минут.
      </p>
      <hr style="border: 0; border-top: 1px solid #EAE8E4; margin: 40px 0;">
      <p style="color: #A39D97; font-size: 10px; text-transform: uppercase; letter-spacing: 1px;">
        Это автоматическое сообщение от IRGG Global. Пожалуйста, не отвечайте на него.
      </p>
    </div>
  `;

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': brevoApiKey,
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: email, name: name || email }],
        subject: `${isReset ? 'Восстановление пароля' : 'Код подтверждения'} IRGG: ${code}`,
        htmlContent: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Brevo API Error:', errorData);
      throw new Error(errorData.message || 'Failed to send email');
    }

    return { success: true };
  } catch (error: any) {
    console.error('Email send failure:', error);
    throw new Error('Не удалось отправить письмо. Попробуйте позже.');
  }
}

// Keep the old export for backward compatibility during transition if needed
export async function sendVerificationEmail(email: string, code: string, name: string) {
  return sendAuthEmail(email, code, name, 'registration');
}
