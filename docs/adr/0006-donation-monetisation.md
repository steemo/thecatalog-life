# ADR-0006: Hybrid Monetisation Model (Donations + Google AdSense)

**Date:** 22 February 2026  
**Status:** Accepted  
**Context:** Quranic App needs sustainable funding without compromising user experience or spiritual integrity

---

## Problem Statement

The Quranic App requires ongoing maintenance, hosting, and content expansion. A single revenue stream is risky; a hybrid approach provides stability and scalability.

**Key Challenges:**
- Single revenue source is unreliable
- Paywalls exclude users who can't pay
- Sponsored content compromises authenticity
- Need to balance monetisation with user experience
- Must respect spiritual nature of content

---

## Decision

Implement a **hybrid monetisation model** combining:
1. **Primary: Donations** (Buy Me a Coffee, Ko-fi, Stripe)
2. **Secondary: Google AdSense** (non-intrusive placements)

**Core Principles:**
1. All content remains free and accessible
2. Donations are voluntary and optional
3. Ads are non-intrusive and respectful
4. No dark patterns or manipulation
5. Transparent about fund usage
6. Respects user privacy

---

## Rationale

### Why Hybrid Model?

**Donations (Primary Revenue)**
- ✅ Sustainable, predictable income
- ✅ Builds genuine community
- ✅ Aligns with Islamic values
- ✅ No tracking or data collection
- ⚠️ Requires active promotion
- ⚠️ Lower revenue initially

**Google AdSense (Secondary Revenue)**
- ✅ Passive income as traffic grows
- ✅ Scales automatically
- ✅ No additional effort required
- ✅ Industry standard
- ⚠️ Lower CPM for niche content
- ⚠️ Requires significant traffic (25k+ monthly)

**Combined Benefits**
- ✅ Diversified revenue streams
- ✅ Reduces financial risk
- ✅ Sustainable long-term
- ✅ Scales with growth
- ✅ Respects user choice (donate or accept ads)

### Why Not Alternatives?

**Donations Only**
- ❌ Unpredictable revenue
- ❌ Requires large user base
- ❌ Difficult to sustain initially
- ✅ Respects spiritual nature

**AdSense Only**
- ❌ Intrusive ads degrade experience
- ❌ Low CPM for niche content
- ❌ Requires 25k+ monthly traffic
- ✅ Passive income

**Paywalls/Premium**
- ❌ Excludes users who can't pay
- ❌ Reduces organic reach
- ❌ Contradicts free knowledge principle

**Sponsorships**
- ❌ Requires vetting sponsors
- ❌ Risk of inappropriate associations
- ❌ Compromises editorial independence

---

## Implementation

### Revenue Streams

**Stream 1: Donations** (Primary)
- Platforms: Buy Me a Coffee, Ko-fi, Stripe
- Placement: Footer button, post-Surah prompt
- Messaging: Transparent, grateful, humble
- Target: Committed supporters

**Stream 2: Google AdSense** (Secondary)
- Ad types: Display ads (banner, rectangle)
- Placements:
  - Between Surah cards (grid view)
  - Below Surah content (after gems)
  - Sidebar (desktop only, 300x250)
  - Sticky footer (mobile only, 320x50, dismissible)
- Targeting: Contextual ads (Islamic content)
- Revenue: Scales with traffic

### Ad Placement Strategy

**Non-Intrusive Principles:**
- No pop-ups or interstitials
- No auto-playing video ads
- No ads in hero section
- No ads between verses/sections
- No ads in navigation
- Ads respect reading flow

**Desktop Layout:**
```
[Header]
[Search & Filter]
[Surah Grid]
  [Card] [Card] [Card]
  [Card] [Card] [Ad 300x250]
  [Card] [Card] [Card]
  [Ad 300x250] [Card] [Card]
[Footer with Donation Button]
```

**Mobile Layout:**
```
[Header]
[Search & Filter]
[Surah Grid - Single Column]
  [Card]
  [Card]
  [Ad 320x50]
  [Card]
  [Card]
[Sticky Footer Ad - Dismissible]
[Footer with Donation Button]
```

**Surah Detail Page:**
```
[Hero Section]
[Sections]
[Themes]
[Lessons]
[Gems]
[Ad 300x250 or 320x50]
[Donation CTA]
[Footer]
```

### Donation Platforms

**Buy Me a Coffee** (Recommended)
- Lowest fees (5% + payment processing)
- Simple embed button
- No minimum traffic
- Built-in supporter community
- Monthly recurring support

**Ko-fi** (Alternative)
- Similar fees (5% + payment processing)
- Community-focused
- Shop/membership features
- Good for creators

**Stripe** (Custom)
- Full control
- Higher fees (2.9% + $0.30)
- Requires custom implementation
- Better for larger operations

### Messaging Strategy

**Donation Button Copy:**
```
"Support this project"
"Help keep Quranic App free"
"Buy me a coffee ☕"
```

**Post-Surah Prompt:**
```
"If this Surah helped your journey, consider supporting the app.
Your donation helps maintain it and add new Surahs."
```

**Transparency:**
- Show how donations are used
- Monthly progress updates
- Community impact metrics
- Creator's commitment

---

## Implementation Timeline

### Phase 1: Foundation (Now)
- [ ] Set up Buy Me a Coffee account
- [ ] Create donation button component
- [ ] Add to footer
- [ ] Write donation messaging

### Phase 2: Enhancement (Month 2)
- [ ] Add optional post-Surah prompt
- [ ] Create About page with story
- [ ] Add impact metrics dashboard
- [ ] Monthly supporter updates

### Phase 3: Community (Month 3+)
- [ ] Supporter recognition (optional)
- [ ] Monthly newsletter for supporters
- [ ] Roadmap voting for supporters
- [ ] Community Discord/forum

---

## Consequences

### Positive

✅ **Diversified Revenue**
- Donations provide predictable income
- AdSense provides passive income
- Combined approach maximises sustainability
- Reduces financial risk

✅ **User Experience**
- Donations optional (no forced ads)
- Ads non-intrusive and respectful
- Clean, distraction-free reading
- Respects user privacy

✅ **Scalability**
- Donations scale with community
- AdSense scales with traffic
- Both grow organically
- Sustainable long-term

✅ **Community Building**
- Supporters feel invested
- Direct feedback channel
- Organic growth potential
- Transparent operations

### Negative

⚠️ **Ad Implementation Complexity**
- Requires AdSense integration
- Need to manage ad placements
- Must avoid intrusive ads
- Requires ongoing monitoring

⚠️ **Revenue Unpredictability**
- Donations depend on user base
- AdSense CPM varies by season
- Combined revenue still unpredictable
- Requires financial planning

⚠️ **User Perception**
- Some users may dislike ads
- Need to balance monetisation with experience
- Requires clear communication
- Risk of negative feedback

---

## Success Metrics

### Financial
- Monthly donation revenue
- Monthly AdSense revenue
- Total monthly revenue
- Revenue growth trajectory
- Cost per user acquisition

### Community
- Supporter count
- Donation frequency
- Average donation amount
- Supporter retention rate
- Community engagement

### Content
- New Surahs added per month
- Feature requests implemented
- User satisfaction scores
- Retention metrics
- Traffic growth

### Ad Performance
- Ad impressions
- Click-through rate (CTR)
- Cost per thousand impressions (CPM)
- Revenue per user (RPU)
- Ad placement effectiveness

---

## Future Considerations

### Phase 2: Optimisation (Month 3-6)
- Monitor donation vs AdSense revenue split
- A/B test ad placements
- Optimise donation messaging
- Analyse user feedback on ads
- Adjust strategy based on data

### Phase 3: Hybrid Enhancement (Month 6+)
If donations underperform:
- Increase AdSense placements
- Add premium features (optional)
- Implement affiliate marketing (carefully)

If AdSense underperforms:
- Focus on donation growth
- Build stronger community
- Increase creator visibility

### Phase 4: Scaling (Year 2+)
- Evaluate sponsorships from Islamic organisations
- Consider grants/funding
- Explore partnerships
- Potential team expansion

---

## Related ADRs

- ADR-0001: React over Next.js (VPS deployment)
- ADR-0005: SEO Strategy (organic growth)

---

## References

- Buy Me a Coffee: https://www.buymeacoffee.com
- Ko-fi: https://ko-fi.com
- Stripe: https://stripe.com

---

**Decision Made By:** Tiko Abousteit  
**Approved By:** Architecture Review  
**Implementation Date:** 22 February 2026
