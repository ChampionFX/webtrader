/**
 * Created by arnab on 2/12/15.
 */

import $ from "jquery";
import $ui from "jquery-ui";
import liveapi from "websockets/binary_websockets";
import menu from "navigation/menu";
import chartWindow from "charts/chartWindow";
import "jquery-growl";
import "common/util";

function refresh_active_symbols() {
    liveapi
        .send({ active_symbols: 'brief' })
        .then(function(data) {
            local_storage.set('active_symbols', data.active_symbols);
            const active_symbols = [];
            console.log(data);
            const active_markets = _(data.active_symbols).groupBy('market').map(function(symbols) {
                const sym = _.head(symbols);
                const market = { name: sym.market, display_name: sym.market_display_name };
                market.submarkets = _(symbols).groupBy('submarket').map(function(symbols) {
                    const sym = _.head(symbols);
                    const submarket = { name: sym.submarket, display_name: sym.submarket_display_name };
                    submarket.instruments = _.map(symbols, function(sym) {
                        active_symbols.push(sym.symbol);
                        return {
                            symbol: sym.symbol,
                            display_name: sym.display_name,
                        };
                    });
                    return submarket;
                }).value();
                return market;
            }).value();
            markets = active_markets.map(function(m) {
                return {
                    display_name: m.display_name,
                    name: m.name,
                    submarkets: m.submarkets
                }
            });

            //console.warn(markets, chartable_markets);
            markets = menu.sortMenu(markets);

            const instruments = $("#nav-menu").find(".instruments");
            instruments.find('> ul').remove();
            menu.refreshMenu(instruments , markets, onMenuItemClick);
        });
}

function onMenuItemClick(symbol, displayName) {
    chartWindow.addNewWindow({
        instrumentCode: symbol,
        instrumentName: displayName,
        timePeriod: '1d',
        type: 'candlestick'
    });
}

let markets = [];
let chartable_markets = [];

export const init = function() {
    /* cache the result of trading_times call, because assetIndex needs the same data */
    return liveapi
        .cached.send({ trading_times: new Date().toISOString().slice(0, 10) })
        .then(function(data) {
            chartable_markets = menu.extractChartableMarkets(data);
            refresh_active_symbols();
            liveapi.events.on('login', refresh_active_symbols);
            liveapi.events.on('logout', refresh_active_symbols);
            return chartable_markets;
        });
}

export const getMarketData = function() {
    return markets;
}

export const isMarketDataPresent = function(marketDataDisplayName, marketData) {
    let present = false;
    if (!marketData) {
        marketData = markets;
    }

    const instrumentObj = this;
    $.each(marketData, function(key, value) {
        if (value.submarkets || value.instruments) {
            present = instrumentObj.isMarketDataPresent(marketDataDisplayName, value.submarkets || value.instruments);
        } else {
            if ($.trim(value.display_name) == $.trim(marketDataDisplayName)) {
                present = true;
            }
        }
        return !present;
    });
    return present;
}

export const getSpecificMarketData = function(marketDataDisplayName, marketData) {
    let present = {};
    if (!marketData) {
        marketData = markets;
    }

    const instrumentObj = this;
    $.each(marketData, function(key, value) {
        if (value.submarkets || value.instruments) {
            present = instrumentObj.getSpecificMarketData(marketDataDisplayName, value.submarkets || value.instruments);
        } else {
            if ($.trim(value.display_name) == $.trim(marketDataDisplayName)) {
                present = value;
            }
        }
        return $.isEmptyObject(present);
    });
    return present;
}

export default {
    init,
    getMarketData,
    isMarketDataPresent,
    getSpecificMarketData
}
