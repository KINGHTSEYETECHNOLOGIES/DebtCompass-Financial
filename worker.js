import { EmailMessage } from "cloudflare:email";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // API route
    if (url.pathname === "/api/email-capture") {
      return handleEmailCapture(request, env, url);
    }

    // Let the real 404 page load normally
    if (url.pathname === "/404" || url.pathname === "/404.html") {
      return env.ASSETS.fetch(request);
    }

    try {
      const assetResponse = await env.ASSETS.fetch(request);

      // Existing file/page -> serve normally
      if (assetResponse.status !== 404) {
        return assetResponse;
      }

      // Missing file/page -> redirect to /404 with original path
      return redirectTo404(request);
    } catch (error) {
      console.error("Asset fetch failed:", error);
      return redirectTo404(request);
    }
  },
};

function redirectTo404(request) {
  const url = new URL(request.url);
  const redirectUrl = new URL("/404", request.url);
  redirectUrl.searchParams.set("from", url.pathname + url.search);
  return Response.redirect(redirectUrl.toString(), 302);
}

async function handleEmailCapture(request, env, url) {
  if (request.method !== "POST") {
    return json({ ok: false, error: "Method not allowed" }, 405);
  }

  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return json({ ok: false, error: "Invalid content type" }, 400);
    }

    const body = await request.json();
    const email = (body.email || "").trim();

    if (!email) {
      return json({ ok: false, error: "Email is required" }, 400);
    }

    if (!isValidEmail(email)) {
      return json({ ok: false, error: "Invalid email address" }, 400);
    }

    const rawMessage = [
      "From: info@debtcompassfinancial.com",
      "To: rossmfine@gmail.com",
      `Reply-To: ${email}`,
      `Subject: New Funnel Email - ${email}`,
      "MIME-Version: 1.0",
      "Content-Type: text/plain; charset=UTF-8",
      "",
      "A new email was submitted from the DebtCompass Financial funnel.",
      "",
      `Submitted email: ${email}`,
      `Submitted at: ${new Date().toISOString()}`,
      `Source: ${url.origin}/`,
    ].join("\n");

    const message = new EmailMessage(
      "info@debtcompassfinancial.com",
      "rossmfine@gmail.com",
      rawMessage
    );

    await env.ROSS_EMAIL.send(message);

    return json({ ok: true }, 200);
  } catch (error) {
    return json(
      {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      },
      500
    );
  }
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}