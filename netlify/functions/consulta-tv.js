// netlify/functions/consulta-tv.js

exports.handler = async (event) => {
  try {
    const body = event.body ? JSON.parse(event.body) : {};
    const symbol_tv = body.symbol_tv || "BTCUSDT.P";
    const capital_base_usdt = body.capital_base_usdt || 10000;
    const risk_usdt = body.risk_usdt || 1;

    const symbol_bingx = symbol_tv.replace(".P", "-USDT").replace("USDT", "-USDT");

    const resposta = {
      symbol_tv,
      symbol_bingx,

      preco_atual: 45000.0,
      tick_size: 0.1,
      spread_pct_atual: 0.0033,
      taker_fee_pct: 0.06,
      maker_fee_pct: 0.02,
      dt_roundtrip_pct: 0.0617,

      max_leverage: 125,
      margin_rate_min_pct: 0.8,
      position_value_max_usdt: 500000.0,

      capital_base_usdt,
      saldo_real_usdt: capital_base_usdt - 124.68,

      atr1_abs: 12.5,
      atr1_pct: 0.0278,
      atr14_abs: 85.0,
      atr14_pct: 0.1889,

      tijolos_1usdt: {
        delta_preco: 0.045,
        num_tijolos: 450,
        pct_equivalente: 0.1
      },

      slippage_max: {
        limiar_usdt: risk_usdt * 2.0,
        delta_preco: 0.09,
        pct_equivalente: 0.2,
        num_tijolos: 900
      },

      renko_ideal: {
        box_pct_ideal: 0.8,
        box_abs_ideal: 36.0,
        margem_segura_pct: 1.72,
        margem_segura_descricao: "2x box_pct_ideal + DT%",
        pct_max_simulado: 3.0
      }
    };

    return {
      statusCode: 200,
      body: JSON.stringify(resposta)
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message })
    };
  }
};
