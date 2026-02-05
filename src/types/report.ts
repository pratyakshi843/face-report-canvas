export interface SessionInfo {
  id: string;
  user_id: string;
  session_id: string;
  status: string;
  total_images: number;
  processed_images: number;
  analysis_type: string;
  created_at: string;
  completed_at: string;
  session_validity: string;
}

export interface HealoncalMetrics {
  diagnostic_accuracy: number;
  biomarkers_analyzed: number;
  image_quality_score: number;
  analysis_confidence: number;
}

export interface SkinClassification {
  skin_type: string;
  skin_tone: string;
  estimated_age: number;
}

export interface SkinHealthMetrics {
  wrinkles_score: number;
  fine_lines_score: number;
  dark_circles_score: number;
  pores_score: number;
  pigmentation_score: number;
  redness_score: number;
  acne_score: number;
  hydration_score: number;
  oiliness_score: number;
  skin_firmness_score: number;
  elasticity_score: number;
  overall_skin_health_score: number;
}

export interface IndividualAnalysis {
  angle: string;
  healoncal_metrics: HealoncalMetrics;
  skin_classification: SkinClassification;
  skin_health_metrics: SkinHealthMetrics;
  analysis_metadata: {
    processing_time_ms: number;
    model_version: string;
    analysis_timestamp: string;
  };
}

export interface PriorityConcern {
  name: string;
  score: number;
  category: string;
  severity: string;
}

export interface DetectedDisease {
  id: string;
  disease_name: string;
  disease_category: string;
  confidence_score: number;
  severity_level: string;
  affected_area: string;
  urgency_level: string;
  symptoms_noted: string[];
  requires_medical_attention: boolean;
  recommended_specialist: string;
}

export interface CombinedAnalysis {
  id: string;
  session_id: string;
  final_skin_type_classification: string;
  final_skin_tone_classification: string;
  estimated_skin_age: number;
  overall_diagnostic_accuracy: number;
  combined_wrinkles_score: number;
  combined_fine_lines_score: number;
  combined_dark_circles_score: number;
  combined_pores_score: number;
  combined_pigmentation_score: number;
  combined_redness_score: number;
  combined_acne_score: number;
  combined_hydration_score: number;
  combined_oiliness_score: number;
  combined_skin_texture_score: number;
  combined_elasticity_score: number;
  combined_radiance_score: number;
  combined_uv_damage_score: number;
  combined_sensitivity_score: number;
  priority_concerns: PriorityConcern[];
  detected_diseases: DetectedDisease[];
}

export interface HeatmapItem {
  disease_name: string;
  category: string;
  confidence: number;
  severity: string;
  url: string;
  index: number;
  colors: {
    alpha: number;
    primary: string;
    secondary: string;
    pinpoint?: string;
  };
  type: string;
}

export interface AngleHeatmaps {
  individual_heatmaps: HeatmapItem[];
  combined_heatmap: string | null;
}

export interface Product {
  category: string;
  product_name: string;
  brand: string;
  key_ingredients: string[];
  target_concern: string;
  usage_instructions: string;
  priority: string;
  price_range: string;
  why_recommended: string;
  medical_grade: boolean;
  dermatologist_approved: boolean;
}

export interface FaceAnalysisReport {
  success: boolean;
  session_id: string;
  results: {
    success: boolean;
    session_id: string;
    session_info: SessionInfo;
    healoncal_results: {
      individual_analyses: IndividualAnalysis[];
      combined_analysis: CombinedAnalysis;
    };
    disease_detections?: DetectedDisease[];
  };
  heatmaps: {
    success: boolean;
    session_id: string;
    images: {
      front: AngleHeatmaps;
      left: AngleHeatmaps;
      right: AngleHeatmaps;
    };
    total_heatmaps: number;
    angles_available: string[];
  };
  recommendations: {
    success: boolean;
    session_id: string;
    recommendations: {
      routine_type: string;
      products: Product[];
    };
  };
}
