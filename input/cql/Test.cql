library Test version '1.0'

using FHIR version '4.0.1'

parameter "Measurement Period" Interval<DateTime>
  default Interval[@2021-01-01T00:00:00.0, @2022-01-01T00:00:00.0)

context Patient

define "Initial Population":
	true

define "Denominator":
	true

define "Denominator Exclusion":
	false

define "Numerator":
	true