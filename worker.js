import { EmailMessage } from "cloudflare:email";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/email-capture") {
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

    const assetResponse = await env.ASSETS.fetch(request);

    if (assetResponse.status === 404) {
      const notFoundUrl = new URL("/404.html", request.url);
      const notFoundRequest = new Request(notFoundUrl.toString(), request);
      const notFoundResponse = await env.ASSETS.fetch(notFoundRequest);

      return new Response(notFoundResponse.body, {
        status: 404,
        statusText: "Not Found",
        headers: {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "no-store",
        },
      });
    }

    return assetResponse;
  },
};

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