"""Polymex Industries: Day 1 'Plant Pulse' dataset generator (facilitator only).

Deterministic (seed 1012). Produces the two CSVs given to participants and the
answer key. Planted signals: extrusion is the constraint; changeovers rise from
~44 to ~78 a week as retail orders grow; M07 loses output to unlogged
micro-stops (low performance, normal logged downtime); M04 drifts on weekends
(lower performance, higher scrap) because its operator's weekday workaround is
not applied; M02 has high logged downtime. Traps: M06 output logged in kg on
three B shifts (22-24 Jan); 11 Mar shift A duplicated for all machines; 17 Feb
shift C missing (logger outage); M03 planned shutdown on 1 Mar (planned_min=0).
"""
import json, numpy as np, pandas as pd
rng = np.random.default_rng(1012)
dates = pd.date_range("2026-01-01", "2026-03-31", freq="D")
shifts, machines, IDEAL = ["A", "B", "C"], [f"M0{i}" for i in range(1, 8)], 2.30
rows = []
for d_i, d in enumerate(dates):
    lam = 0.30 + 0.23 * d_i / (len(dates) - 1)
    weekend = d.dayofweek >= 5
    for s in shifts:
        for m in machines:
            planned = 0 if (m == "M03" and d == pd.Timestamp("2026-03-01")) else 480
            if planned == 0:
                rows.append(dict(date=d.date().isoformat(), shift=s, machine=m, planned_min=0, changeovers=0,
                                 changeover_min=0, unplanned_downtime_min=0, other_stop_min=0, run_min=0,
                                 output_t=0.0, scrap_t=0.0, ideal_rate_tph=IDEAL)); continue
            n_co = rng.poisson(lam)
            co_min = sum(max(40, rng.normal(95, 25)) + (60 if rng.random() < 0.06 else 0) for _ in range(n_co))
            dt_mean = 75 if m == "M02" else 38
            dt = rng.gamma(2.0, dt_mean / 2.0)
            other = max(0, rng.normal(42, 12))
            run = max(0.0, planned - co_min - dt - other)
            perf = 0.895 * (0.96 if s == "C" else 1.0)
            if m == "M07": perf *= 0.88
            if m == "M04": perf *= (0.85 if weekend else 1.02)
            perf = min(0.99, max(0.4, perf + rng.normal(0, 0.02)))
            out = run / 60 * IDEAL * perf
            scrap_rate = 0.06 * (1.6 if (m == "M04" and weekend) else 1.0) * max(0.5, rng.normal(1, 0.12))
            rows.append(dict(date=d.date().isoformat(), shift=s, machine=m, planned_min=planned, changeovers=int(n_co),
                             changeover_min=round(co_min), unplanned_downtime_min=round(dt), other_stop_min=round(other),
                             run_min=round(planned - round(co_min) - round(dt) - round(other)) if run > 0 else 0,
                             output_t=round(out, 2), scrap_t=round(out * scrap_rate, 2), ideal_rate_tph=IDEAL))
clean = pd.DataFrame(rows)
clean["run_min"] = clean["run_min"].clip(lower=0)
# Remove the logger outage rows (17 Feb, shift C) from both the clean truth and the delivered file
clean = clean[~((clean.date == "2026-02-17") & (clean["shift"] == "C"))].reset_index(drop=True)

# Delivered file with traps
dirty = clean.copy()
kg_mask = (dirty.machine == "M06") & (dirty["shift"] == "B") & dirty.date.isin(["2026-01-22", "2026-01-23", "2026-01-24"])
dirty.loc[kg_mask, ["output_t", "scrap_t"]] = (dirty.loc[kg_mask, ["output_t", "scrap_t"]] * 1000).round(0)
dup = dirty[(dirty.date == "2026-03-11") & (dirty["shift"] == "A")]
dirty = pd.concat([dirty, dup]).sort_values(["date", "shift", "machine"], kind="stable").reset_index(drop=True)

# Stage daily file (plant level, 7 units per stage, 3 shifts)
stage_rows = []
for d in sorted(clean.date.unique()):
    day = clean[clean.date == d]
    ext_out, ext_good = day.output_t.sum(), (day.output_t - day.scrap_t).sum()
    planned_units = day.planned_min.sum()
    for stage, out, starved, blocked in [
        ("mixing", ext_out * rng.normal(1.01, 0.01), rng.normal(60, 20), rng.normal(1150, 150)),
        ("extrusion", ext_out, rng.normal(35, 12), rng.normal(25, 10)),
        ("packing", ext_good * rng.normal(1.0, 0.008), rng.normal(1650, 180), rng.normal(40, 15))]:
        stage_rows.append(dict(date=d, stage=stage, units=7, planned_min=int(planned_units),
                               output_t=round(out, 1), starved_min=max(0, round(starved)), blocked_min=max(0, round(blocked))))
stage = pd.DataFrame(stage_rows)

out_dir = "../participant/polymex-plant-pulse/data/"
dirty.to_csv(out_dir + "extrusion_shift_log.csv", index=False)
stage.to_csv(out_dir + "stage_daily.csv", index=False)

# ---------- Answer key (computed on clean data) ----------
c = clean
def oee(df):
    A = df.run_min.sum() / df.planned_min.sum()
    P = df.output_t.sum() / (df.run_min.sum() / 60 * IDEAL)
    Q = (df.output_t - df.scrap_t).sum() / df.output_t.sum()
    return dict(availability=round(A, 3), performance=round(P, 3), quality=round(Q, 3), oee=round(A * P * Q, 3))
c = c.assign(dt=pd.to_datetime(c.date), week=lambda x: x.dt.dt.isocalendar().week, weekend=lambda x: x.dt.dt.dayofweek >= 5)
per_machine = {m: oee(g) for m, g in c.groupby("machine")}
fleet_perf_ex_m07 = c[c.machine != "M07"].output_t.sum() / (c[c.machine != "M07"].run_min.sum() / 60 * IDEAL)
m07 = c[c.machine == "M07"]
m07_lost_t = fleet_perf_ex_m07 * m07.run_min.sum() / 60 * IDEAL - m07.output_t.sum()
m04 = c[c.machine == "M04"]
weekly_co = c.groupby("week").changeovers.sum()
key = {
    "rows_delivered": int(len(dirty)), "rows_clean": int(len(c)),
    "traps": {
        "kg_rows": "M06, shift B, 2026-01-22/23/24: output_t and scrap_t logged in kg (values above 1,000)",
        "duplicated_rows": int(len(dup)), "missing_shift": "2026-02-17 shift C, all 7 machines (21 machine-shifts expected, 0 present)",
        "planned_shutdown": "M03 2026-03-01, planned_min = 0 on 3 shifts",
        "total_output_t_if_uncleaned": round(float(dirty.output_t.sum()), 1),
        "total_output_t_clean": round(float(c.output_t.sum()), 1)},
    "plant_extrusion_oee": oee(c),
    "good_output_t_total": round(float((c.output_t - c.scrap_t).sum()), 1),
    "good_output_t_per_day": round(float((c.output_t - c.scrap_t).sum() / 90), 1),
    "per_machine": per_machine,
    "changeovers_per_full_week_first_last": [int(c[(c.dt >= "2026-01-05") & (c.dt <= "2026-01-11")].changeovers.sum()),
                                              int(c[(c.dt >= "2026-03-23") & (c.dt <= "2026-03-29")].changeovers.sum())],
    "good_output_t_per_day_jan_vs_mar": [round(float((c[c.dt.dt.month == 1].output_t - c[c.dt.dt.month == 1].scrap_t).sum() / 31), 1),
                                          round(float((c[c.dt.dt.month == 3].output_t - c[c.dt.dt.month == 3].scrap_t).sum() / 31), 1)],
    "march_good_t_lost_to_extra_changeovers_vs_jan_rate": round(float(
        (c[c.dt.dt.month == 3].changeover_min.sum() / c[c.dt.dt.month == 3].planned_min.sum()
         - c[c.dt.dt.month == 1].changeover_min.sum() / c[c.dt.dt.month == 1].planned_min.sum())
        * c[c.dt.dt.month == 3].planned_min.sum() / 60 * IDEAL * oee(c)["performance"] * oee(c)["quality"]), 1),
    "changeover_share_jan_vs_mar": [round(float(c[c.dt.dt.month == 1].changeover_min.sum() / c[c.dt.dt.month == 1].planned_min.sum()), 3),
                                     round(float(c[c.dt.dt.month == 3].changeover_min.sum() / c[c.dt.dt.month == 3].planned_min.sum()), 3)],
    "m04_performance_weekday_vs_weekend": [round(float(m04[~m04.weekend].output_t.sum() / (m04[~m04.weekend].run_min.sum() / 60 * IDEAL)), 3),
                                            round(float(m04[m04.weekend].output_t.sum() / (m04[m04.weekend].run_min.sum() / 60 * IDEAL)), 3)],
    "m04_scrap_rate_weekday_vs_weekend": [round(float(m04[~m04.weekend].scrap_t.sum() / m04[~m04.weekend].output_t.sum()), 3),
                                           round(float(m04[m04.weekend].scrap_t.sum() / m04[m04.weekend].output_t.sum()), 3)],
    "m07_lost_t_vs_fleet_performance": round(float(m07_lost_t), 1),
    "m02_downtime_share_vs_others": [round(float(c[c.machine == "M02"].unplanned_downtime_min.sum() / c[c.machine == "M02"].planned_min.sum()), 3),
                                      round(float(c[c.machine != "M02"].unplanned_downtime_min.sum() / c[c.machine != "M02"].planned_min.sum()), 3)],
    "stage_wait_minutes_per_day": {s: {"starved": round(float(g.starved_min.mean())), "blocked": round(float(g.blocked_min.mean()))} for s, g in stage.groupby("stage")},
    "shift_performance": {s: round(float(g.output_t.sum() / (g.run_min.sum() / 60 * IDEAL)), 3) for s, g in c.groupby("shift")},
}
json.dump(key, open("answer_key_day1.json", "w"), indent=2)
print(json.dumps(key, indent=2))
